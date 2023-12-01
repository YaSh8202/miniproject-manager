"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const teamInfoFormSchema = z.object({
  teamName: z
    .string({
      required_error: "Team name is required",
    })
    .min(4),
  projectTitle: z
    .string({
      required_error: "Project title is required",
    })
    .min(4),
  projectDescription: z.string().min(4).optional(),
});

type teamInfoFormSchemaType = z.infer<typeof teamInfoFormSchema>;

const TeamInfoForm = () => {
  const router = useRouter();

  const form = useForm<teamInfoFormSchemaType>({
    resolver: zodResolver(teamInfoFormSchema),
  });

  function onSubmit(values: teamInfoFormSchemaType) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="teamName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Name *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Choose a unique and creative name for your team.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="projectTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Title *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="projectDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                Briefly describe the goals and scope of your project. If you
                don&apos;t have a project idea yet, you can leave this field
                blank.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between mt-2">
          <Button
            variant={"outline"}
            onClick={() => {
              router.back();
            }}
            type="button"
          >
            Cancel
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
};

export default TeamInfoForm;
