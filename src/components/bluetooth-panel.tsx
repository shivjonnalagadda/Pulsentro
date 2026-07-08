"use client";

import { useEffect, useRef, useState } from "react";
import { parseHeartRateMeasurement } from "@/lib/heart-rate";

export function BluetoothPanel() {
  const [device, setDevice] = useState<BluetoothDevice | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [status, setStatus] = useState(
    "Connect to a compatible Bluetooth heart-rate monitor to begin."
  );
  const [currentBpm, setCurrentBpm] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const deviceRef = useRef<BluetoothDevice | null>(null);
  const characteristicRef = useRef<BluetoothRemoteGATTCharacteristic | null>(null);

  useEffect(() => {
    deviceRef.current = device;
  }, [device]);

  useEffect(() => {
    return () => {
      if (characteristicRef.current) {
        characteristicRef.current.stopNotifications().catch(() => undefined);
      }
      if (deviceRef.current?.gatt?.connected) {
        deviceRef.current.gatt.disconnect();
      }
    };
  }, []);

  const handleValueChanged = (event: Event) => {
    const target = event.target as BluetoothRemoteGATTCharacteristic;
    const value = target.value;

    if (!value) {
      return;
    }

    const parsedBpm = parseHeartRateMeasurement(value);
    if (parsedBpm) {
      setCurrentBpm(parsedBpm);
      setStatus("Live heart-rate data is streaming.");
    }
  };

  const disconnectDevice = async () => {
    if (characteristicRef.current) {
      try {
        await characteristicRef.current.stopNotifications();
      } catch {
        // Ignore cleanup errors.
      }
      characteristicRef.current.removeEventListener(
        "characteristicvaluechanged",
        handleValueChanged
      );
      characteristicRef.current = null;
    }

    if (deviceRef.current?.gatt?.connected) {
      deviceRef.current.gatt.disconnect();
    }

    setDevice(null);
    setCurrentBpm(null);
    setStatus("Disconnected. You can connect again at any time.");
  };

  const connectDevice = async () => {
    if (typeof navigator === "undefined" || !("bluetooth" in navigator)) {
      setErrorMessage("This browser does not support the Web Bluetooth API.");
      setStatus("Bluetooth is not available in this browser.");
      return;
    }

    setIsConnecting(true);
    setErrorMessage(null);
    setStatus("Requesting access to your heart-rate device...");

    try {
      const requestedDevice = await navigator.bluetooth.requestDevice({
        filters: [{ services: ["heart_rate"] }],
        optionalServices: ["battery_service"],
      });

      if (!requestedDevice.gatt) {
        throw new Error("This device does not expose GATT services.");
      }

      setDevice(requestedDevice);
      setStatus(`Connecting to ${requestedDevice.name ?? "your device"}...`);

      const server = await requestedDevice.gatt.connect();
      const service = await server.getPrimaryService("heart_rate");
      const measurementCharacteristic = await service.getCharacteristic(
        "heart_rate_measurement"
      );

      await measurementCharacteristic.startNotifications();
      measurementCharacteristic.addEventListener(
        "characteristicvaluechanged",
        handleValueChanged
      );

      characteristicRef.current = measurementCharacteristic;
      setStatus(
        `Connected to ${requestedDevice.name ?? "your heart-rate device"}.`
      );
      setCurrentBpm(null);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Could not connect to the device.";
      setErrorMessage(message);
      setStatus("Connection was interrupted or blocked.");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-950/60">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">
            Bluetooth connection
          </p>
          <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
            {status}
          </p>
        </div>
        <div className="rounded-full bg-emerald-500/15 px-3 py-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
          {device?.gatt?.connected ? "Live" : "Ready"}
        </div>
      </div>

      <div className="mt-6 rounded-[1.25rem] bg-white/80 p-5 shadow-sm dark:bg-slate-900/80">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
          Current reading
        </p>
        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-4xl font-semibold text-slate-900 dark:text-white">
              {currentBpm ? `${currentBpm} bpm` : "-- bpm"}
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {device?.name ? `Connected to ${device.name}` : "No device connected yet"}
            </p>
          </div>
          <button
            type="button"
            onClick={device?.gatt?.connected ? disconnectDevice : connectDevice}
            disabled={isConnecting}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            {isConnecting
              ? "Connecting..."
              : device?.gatt?.connected
                ? "Disconnect"
                : "Connect to Bluetooth"}
          </button>
        </div>
      </div>

      {errorMessage ? (
        <p className="mt-4 text-sm text-rose-600 dark:text-rose-400">{errorMessage}</p>
      ) : null}

      <div className="mt-5 rounded-[1.25rem] border border-slate-200/70 bg-slate-100/70 p-4 text-sm leading-7 text-slate-600 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300">
        <p>
          The app uses the Web Bluetooth API, which works in supported browsers such as Chrome and Edge.
        </p>
        <p className="mt-2">
          If your device is not detected, make sure it is paired and nearby before trying again.
        </p>
      </div>
    </div>
  );
}
