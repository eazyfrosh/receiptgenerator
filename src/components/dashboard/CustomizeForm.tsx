"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { UploadCloud, X } from "lucide-react";
import { useReceiptStore } from "@/lib/store";
import { ReceiptData, PAYMENT_METHODS, CURRENCIES, ReceiptStatus } from "@/lib/types";

type FormValues = Omit<ReceiptData, "templateId" | "avatarDataUrl">;

export function CustomizeForm() {
  const data = useReceiptStore((s) => s.data);
  const revision = useReceiptStore((s) => s.revision);
  const update = useReceiptStore((s) => s.update);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, reset } = useForm<FormValues>({ defaultValues: toFormValues(data) });

  // Force-resync the (uncontrolled) form fields only when data changed from
  // outside normal typing: undo, redo, template load/new/delete.
  useEffect(() => {
    reset(toFormValues(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revision]);

  function field<K extends keyof FormValues>(name: K) {
    return register(name, {
      onChange: (e) => update({ [name]: e.target.value } as Partial<ReceiptData>),
    });
  }

  function handleAvatarFile(file: File | undefined) {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => update({ avatarDataUrl: reader.result as string });
    reader.readAsDataURL(file);
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
      <section>
        <label className="field-label">Avatar (optional)</label>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            handleAvatarFile(e.dataTransfer.files?.[0]);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed px-4 py-3 text-sm transition ${
            dragActive
              ? "border-studio-flux bg-studio-flux/5"
              : "border-studio-mist/40 hover:border-studio-flux/50"
          }`}
        >
          <UploadCloud size={18} className="text-studio-slate" />
          <span className="text-studio-slate">
            {data.avatarDataUrl ? "Replace image" : "Drag & drop or click to upload"}
          </span>
          {data.avatarDataUrl && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                update({ avatarDataUrl: null });
              }}
              className="ml-auto rounded-full p-1 hover:bg-studio-coral/10"
            >
              <X size={14} className="text-studio-coral" />
            </button>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleAvatarFile(e.target.files?.[0])}
        />
      </section>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Sender name">
          <input className="field-input" {...field("senderName")} />
        </Field>
        <Field label="Recipient name">
          <input className="field-input" {...field("recipientName")} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Amount">
          <input className="field-input" inputMode="decimal" {...field("amount")} />
        </Field>
        <Field label="Currency">
          <select className="field-input" {...field("currency")}>
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Date">
          <input type="date" className="field-input" {...field("date")} />
        </Field>
        <Field label="Time">
          <input type="time" className="field-input" {...field("time")} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Transaction ID">
          <input className="field-input" {...field("transactionId")} />
        </Field>
        <Field label="Reference number">
          <input className="field-input" {...field("referenceNumber")} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Receipt number">
          <input className="field-input" {...field("receiptNumber")} />
        </Field>
        <Field label="Balance after payment">
          <input className="field-input" {...field("balanceAfter")} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Payment method">
          <select className="field-input" {...field("paymentMethod")}>
            {PAYMENT_METHODS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Status">
          <select className="field-input" {...field("status")}>
            {(["Completed", "Pending", "Failed"] as ReceiptStatus[]).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Payment note">
        <textarea className="field-input min-h-[72px] resize-none" {...field("note")} />
      </Field>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      {children}
    </div>
  );
}

function toFormValues(data: ReceiptData): FormValues {
  return {
    senderName: data.senderName,
    recipientName: data.recipientName,
    amount: data.amount,
    currency: data.currency,
    date: data.date,
    time: data.time,
    transactionId: data.transactionId,
    referenceNumber: data.referenceNumber,
    note: data.note,
    status: data.status,
    paymentMethod: data.paymentMethod,
    receiptNumber: data.receiptNumber,
    balanceAfter: data.balanceAfter,
  };
}
