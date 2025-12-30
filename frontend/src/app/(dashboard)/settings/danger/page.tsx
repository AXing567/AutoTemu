"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteCurrentUser } from "@/lib/api/users";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DangerSettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const handleDeleteAccount = async () => {
    if (confirmText !== "删除我的账户") {
      toast.error("确认文本不匹配");
      return;
    }

    try {
      setIsLoading(true);
      await deleteCurrentUser();
      toast.success("账户已删除");
      await signOut({ redirect: false });
      router.push("/login");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "删除账户失败"
      );
    } finally {
      setIsLoading(false);
      setConfirmText("");
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">危险区域</h1>
        <p className="text-sm text-slate-600 mt-1">不可逆转的操作</p>
      </div>

      <div className="rounded-lg bg-red-50 border border-red-200 p-6 shadow max-w-2xl">
        <div className="space-y-4">
          <div>
            <h2 className="font-semibold text-red-900">删除账户</h2>
            <p className="text-sm text-red-700 mt-2">
              删除您的账户是永久性的。所有与您账户相关的数据将被删除，此操作无法撤销。
            </p>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">删除我的账户</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogTitle>确认删除账户</AlertDialogTitle>
              <AlertDialogDescription>
                此操作不可撤销。请输入以下文本进行确认：
              </AlertDialogDescription>
              <div className="space-y-4 py-4">
                <p className="text-sm font-medium">请输入以下内容：</p>
                <p className="text-sm bg-slate-100 p-2 rounded font-mono">
                  删除我的账户
                </p>
                <Input
                  placeholder="输入确认文本"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <AlertDialogCancel>取消</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  disabled={
                    isLoading || confirmText !== "删除我的账户"
                  }
                  className="bg-red-600 hover:bg-red-700"
                >
                  {isLoading ? "删除中..." : "确认删除"}
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
