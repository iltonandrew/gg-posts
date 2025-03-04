import React, { useState } from "react";
import { useTRPC } from "@/utils/trpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Input } from "@heroui/react";
import { Textarea } from "@heroui/react";
import { Button } from "@heroui/react";

export function CreatePost() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { mutateAsync } = useMutation(
    trpc.createPost.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.getPosts.queryOptions());
        setTitle("");
        setContent("");
      },
    })
  );

  return (
    <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4">
      <Input
        label="Title"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        label="Description"
        placeholder="Enter your description"
        onChange={(e) => setContent(e.target.value)}
      />
      <Button
        color="primary"
        onPress={async () => {
          await mutateAsync({
            title,
            content,
          });
        }}
      >
        Create Post
      </Button>
    </div>
  );
}
