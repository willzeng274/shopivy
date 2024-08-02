import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/InputOTP";
import Form from "./Form";
import { handleVerify } from "./actions";
import Redirect from "./redirect";

export default function Verify() {
	return (
        <div className="w-full flex flex-col items-center justify-center gap-y-4">
            <h1>Please the 6 digit verification code sent to your email</h1>
            <Redirect />
            <Form className="flex flex-col justify-center items-center gap-y-2" action={handleVerify}>
                <InputOTP maxLength={6} name="pin">
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                    {/* </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup> */}
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
                <button className="rounded-sm bg-black text-white py-1 px-4" type="submit">Verify</button>
            </Form>
        </div>
	);
}
