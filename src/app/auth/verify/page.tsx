import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/InputOTP";
import Form from "../_components/Form";
import { handleVerify, resendEmail } from "../actions";
import Redirect from "../redirect";
import FormBtn from "../_components/FormBtn";

export default function Verify() {
	return (
        <>
            <h2 className="text-center text-neutral-800 dark:text-neutral-200 mb-4">Please the 6 digit verification code sent to your email</h2>
            <Redirect />
            <Form className="flex flex-col justify-center items-center gap-y-2" action={handleVerify}>
                <InputOTP maxLength={6} name="pin">
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
                
                <FormBtn className="rounded-sm bg-black text-white py-1 px-4" type="submit">Verify</FormBtn>
            </Form>
            <Form action={resendEmail}>
                <FormBtn afterSubmit className="text-blue-400 hover:underline text-sm disabled:hover:no-underline disabled:text-blue-200 disabled:cursor-not-allowed" type="submit">Resend email</FormBtn>
            </Form>
        </>
	);
}
