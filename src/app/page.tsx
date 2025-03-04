"use client";
import React from "react";
import { useSession, signIn, signOut } from "@/lib/auth-client";
import { Button } from "@heroui/button";
import { User } from "@heroui/react";
import { DiscordIcon } from "@/components/icons";
import { useQuery } from "@tanstack/react-query";
import { CreatePost } from "@/components/CreatePost";
import { Post } from "@/components/Post";
import { useTRPC } from "@/utils/trpc";
export default function Home() {
  const { data } = useSession();
  const trpc = useTRPC();

  const { data: posts } = useQuery(trpc.getPosts.queryOptions());

  return (
    <div className="flex w-full flex-col justify-center">
      {data?.session && (
        <div className="flex flex-col">
          <p className="mb-4 text-lg">
            Express yourself, <b>{data.user.name}</b>!
          </p>
          <CreatePost />
        </div>
      )}
      <div className="flex flex-col">
        <h1 className="my-8 font-bold text-xl">Posts</h1>
        <div className="flex flex-col gap-5 min-w-full">
          {posts?.map((post) => <Post key={post.id} post={post} />)}
        </div>
      </div>
    </div>
  );
}
