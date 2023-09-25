import {
    ValidationOptions,
    registerDecorator,
    ValidationArguments,
} from 'class-validator';

export function validatePassword(
    validationOptions?: ValidationOptions,
): PropertyDecorator {
    return function (object: Object, propertyName: string) {
        let errors = [];

        registerDecorator({
            name: 'validatePassword',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {

                    let validate: boolean = true;

                    let validations = [typeof value === 'string', value.length >= 8, /[a-z]/.test(value), /[A-Z]/.test(value), /\d/.test(value), /[!@#$%^&*]/.test(value)];
                    let validationMessage = ["Password must be a string", "Password must be at least 8 characters long", "Password must contain at least one lowercase letter", "Password must contain at least one uppercase letter", "Password must contain at least one number", "Password must contain at least one special character"];

                    for (let i = 0; i < validations.length; i++) {
                        if (!validations[i]) {
                            validate = false;
                            errors.push(validationMessage[i]);
                        }
                    }

                    return validate;
                },
                defaultMessage(args: ValidationArguments) {
                    return errors.join(',');
                }
            },
        });
    };
}
