import toast from "react-hot-toast";

export function showToast({ title, description }: { title: string, description: string }) {
    if (title === "success") {
        toast.success(description)
    }
    toast.error(description)
}