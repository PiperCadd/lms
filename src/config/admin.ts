import { FieldDefinition } from "@/components/common/CustomForm";

export const loginFormFields = [
    {
        name: 'email',
        label: 'Email',
        type: 'text',
        placeholder: 'example@user.com',
        required: true

    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'password',
        required: true
    }
]as const satisfies FieldDefinition[];

export const forgotPasswordFormFields = [
    {
        name: 'email',
        label: 'Email id',
        type: 'text',
        placeholder: 'example@user.com',
        required: true

    },
]as const satisfies FieldDefinition[];

export const resetPasswordFormFields = [
    {
        name: 'newPassword',
        label: 'New Password',
        type: 'password',
        placeholder: 'Enter new password',
        required: true
    },
    {
        name: 'password',
        label: 'Confirm Password',
        type: 'password',
        placeholder: 'confirm password',
        required: true
    }
]as const satisfies FieldDefinition[];