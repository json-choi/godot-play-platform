"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function UploadForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pckFile, setPckFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pckFile) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("pck", pckFile);
      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      const response = await fetch("/api/games", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert(`게임이 업로드되었습니다! ID: ${data.id}`);
      } else {
        const error = await response.json();
        alert(`업로드 실패: ${error.error?.message || "알 수 없는 오류"}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("업로드 중 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>게임 정보</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              게임 이름 *
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="게임 이름을 입력하세요"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              설명
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="게임 설명을 입력하세요"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="pck" className="text-sm font-medium">
              PCK 파일 *
            </label>
            <Input
              id="pck"
              type="file"
              accept=".pck"
              onChange={(e) => setPckFile(e.target.files?.[0] || null)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="thumbnail" className="text-sm font-medium">
              썸네일 이미지
            </label>
            <Input
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
            />
          </div>

          <Button type="submit" disabled={isUploading || !pckFile} className="w-full">
            {isUploading ? "업로드 중..." : "업로드"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
