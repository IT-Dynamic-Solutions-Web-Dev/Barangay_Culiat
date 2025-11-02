import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUp() {
  return (
    <>
      <PageMeta
        title="Barangay Culiat"
        description="Sign up for Barangay Culiat"
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
