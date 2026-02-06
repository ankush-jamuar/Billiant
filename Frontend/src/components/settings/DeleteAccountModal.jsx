import { useState } from "react";
import toast from "react-hot-toast";
import Input from "../ui/Input";
import Button from "../ui/Button";

const DeleteAccountModal = ({ open, onClose, onConfirm }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleDelete = async () => {
    if (!password) {
      toast.error("Password is required");
      return;
    }

    try {
      setLoading(true);
      await onConfirm(password);   // 🔥 delegate action
      onClose();                   // close modal on success
    } catch (err) {
      // error toast handled in parent
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-red-700">
          Confirm account deletion
        </h2>

        <p className="mt-2 text-sm text-slate-600">
          This will permanently delete your account, invoices, and clients.
          This action cannot be undone.
        </p>

        <div className="mt-6">
          <Input
            label="Enter your password to confirm"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            onClick={onClose}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading ? "Deleting…" : "Delete permanently"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
