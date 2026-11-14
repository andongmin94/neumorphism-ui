import { Form, type FormProps } from "@/components/ui/form";

interface ProfileValues {
  displayName: string;
}

const submit = (values: ProfileValues) => {
  values.displayName.toUpperCase();
};

const formProps: FormProps<ProfileValues> = { onFormSubmit: submit };

export function FormValueTypes() {
  return (
    <>
      <Form<ProfileValues>
        onFormSubmit={(values) => {
          values.displayName.toUpperCase();
          // @ts-expect-error Form values preserve the named interface.
          values.missing;
        }}
      />
      <Form onFormSubmit={submit} />
      <Form {...formProps} />
    </>
  );
}
