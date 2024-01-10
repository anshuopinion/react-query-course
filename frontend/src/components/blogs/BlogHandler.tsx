import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Form, Formik, Field, FieldProps } from "formik";
import { Input } from "../ui/input";
import { useState } from "react";
export interface BlogHandlerProps {}

export function BlogHandler(props: BlogHandlerProps) {
  const [open, setOpen] = useState(false);
  const {} = props;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Add Blog</Button>
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
            initialValues={{ title: "", content: "" }}
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
