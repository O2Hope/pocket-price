import Form from "next/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <Form className="my-auto flex flex-col gap-4 items-end" action="/search">
      <Input name="q" placeholder="Search any card (i.e. Pikachu 003)" />
      <Button type="submit">Search!</Button>
    </Form>
  );
}
