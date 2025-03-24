import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { UserStatus } from "@/app/lib/enums/user";
import { capitalize } from "@/app/utils/capitalize";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "@/app/components/templates/Form";
import Select from "@/app/components/molecules/Select";
import TextField from "@/app/components/molecules/TextField";
import { createUser } from "@/app/lib/actions/user-actions";

const schema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().min(2, "Last name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  initials: z.string().optional(),
  status: z.nativeEnum(UserStatus),
});

type FormData = z.infer<typeof schema>;

export default function CreateUserForm() {
  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      last_name: "",
      email: "",
      status: UserStatus.ACTIVE,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const { user } = await createUser(data);
    console.log({ user });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} title="Create User">
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
