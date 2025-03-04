import React from "react";
import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server";
import { Card, CardHeader, CardBody, CardFooter, Avatar } from "@heroui/react";

export const Post = ({
  post,
}: {
  post: inferRouterOutputs<AppRouter>["getPosts"][number];
}) => {
  return (
    <Card className="min-w-full">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src={post.user.image!} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {post.user.name}
            </h4>
          </div>
        </div>
      </CardHeader>
      <CardBody className="text-small text-default-400">
        <h4 className="font-semibold text-default-600">{post.title}</h4>
        <p>{post.content}</p>
      </CardBody>
      <CardFooter>
        <p className="text-small text-default-400">
          Posted at:{" "}
          {post.createdAt.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </p>
      </CardFooter>
    </Card>
  );
};
