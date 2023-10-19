import { useForm } from 'react-hook-form';

export function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('login', { required: true })} />
            <input {...register('password', { required: true })} />
            {errors.exampleRequired && <span>This field is required</span>}
            <input type="submit" />
        </form>
    );
}
