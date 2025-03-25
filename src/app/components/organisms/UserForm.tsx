import { useForm, Controller } from "react-hook-form";
import { UserStatus } from "@/app/lib/enums/user";
import { capitalize } from "@/app/utils/capitalize";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "@/app/components/templates/Form";
import Select from "@/app/components/molecules/Select";
import TextField from "@/app/components/molecules/TextField";
import { User } from "@/app/lib/db/types";
import { FormData, schema } from "@/app/lib/schemas/user-schema";

type UserFormProps = {
  onSubmit: (data: FormData) => void;
  title: string;
  buttonLabel?: string;
  user?: User;
};

export default function UserForm({
  user,
  onSubmit,
  title,
  buttonLabel = "Create",
}: UserFormProps) {
  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      last_name: user?.last_name || "",
      email: user?.email || "",
      status: user?.status || UserStatus.ACTIVE,
      first_name: user?.first_name || undefined,
      initials: user?.initials || undefined,
    },
    resolver: zodResolver(schema),
  });

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      title={title}
      buttonLabel={buttonLabel}
    >
      <Controller
        name="first_name"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="First Name"
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="last_name"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Last Name"
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="initials"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Initials"
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="status"
        control={control}
        render={({ field, fieldState }) => (
          <Select
            {...field}
            options={Object.entries(UserStatus).map(([key, value]) => ({
              label: capitalize(value),
              value: key,
            }))}
            id="status"
            label="Status"
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Email"
            error={fieldState.error?.message}
          />
        )}
      />
    </Form>
  );
}
