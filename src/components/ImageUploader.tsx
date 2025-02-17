"use client";

import type React from "react";

import { useImageContext } from "../context/ImageContext";

export default function ImageUploader() {
  const { setFiles } = useImageContext();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className="mb-8">
      <label
        htmlFor="file-upload"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Upload Images
      </label>
      <input
        id="file-upload"
        name="file-upload"
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100"
        aria-describedby="file-upload-help"
      />
      <p className="mt-1 text-sm text-gray-500" id="file-upload-help">
        Select one or more image files to process.
      </p>
    </div>
  );
}
