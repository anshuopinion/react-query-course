import { Form, Formik, Field, FieldProps } from "formik";

import { useState } from "react";

import { BlogType } from "@/types";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export interface BlogHandlerProps {
  isUpdate?: boolean;
  blog?: BlogType;
}

export function BlogHandler(props: BlogHandlerProps) {
  const [open, setOpen] = useState(false);
  const { isUpdate = false, blog } = props;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" onClick={() => setOpen(true)}>
          Add Blog
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Blog</DialogTitle>
          <DialogDescription>
            Enter your blog title and content
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Formik
            initialValues={
              isUpdate
                ? { title: blog?.title, content: blog?.content }
                : { title: "", content: "" }
            }
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            <Form className="flex flex-col gap-4 justify-end">
              <label htmlFor="title">Title</label>
              <Field name="title">
                {({ field, meta }: FieldProps) => (
                  <div>
                    <Input type="text" {...field} />
                    {meta.touched && meta.error && (
                      <div className="error">{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>

              <label htmlFor="content">Content</label>
              <Field name="content">
                {({ field, meta }: FieldProps) => (
                  <div>
                    <Input type="text" {...field} />
                    {meta.touched && meta.error && (
                      <div className="error">{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>
              <div className="flex justify-end">
                <Button className="mt-4" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </DialogContent>
    </Dialog>
  );
}
