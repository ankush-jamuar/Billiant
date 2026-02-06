import toast from "react-hot-toast";
import Button from "../../components/ui/Button";
import { deleteAccount } from "../../services/auth.services";
import { useNavigate } from "react-router-dom";

const DangerZone = () => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmed = confirm(
      "This will permanently delete your account, invoices, and clients.\n\nThis action cannot be undone."
    );

    if (!confirmed) return;

    try {
      await deleteAccount();

      toast.success("Account deleted permanently");

      localStorage.clear();

      setTimeout(() => {
        navigate("/register");
      }, 1200);

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Failed to delete account"
      );
    }
  };

  return (
    <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
      <h2 className="text-lg font-semibold text-red-700">
        Danger zone
      </h2>
      <p className="mt-1 text-sm text-red-600">
        Permanently delete your account and all data
      </p>

      <div className="mt-6">
        <Button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700"
          type="button"
        >
          Delete account permanently
        </Button>
      </div>
    </section>
  );
};

export default DangerZone;
