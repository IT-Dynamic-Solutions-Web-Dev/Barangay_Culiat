import PageMeta from "../../components/common/PageMeta";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Barangay Culiat"
        description="Sign in to Barangay Culiat Admin Portal"
      />
      <SignInForm />
    </>
  );
}
