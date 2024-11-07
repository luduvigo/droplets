// app/profile/[handle]/page.tsx
import { Layout } from "@/components/Layout";
import ProfileDetailsClient from "@/components/Profile/ProfileDetailsClient";

interface ProfileDetailsProps {
  params: {
    handle: string;
  };
}

export default function ProfileDetails({ params }: ProfileDetailsProps) {
  const { handle } = params;

  return (
    <Layout>
      <div className="w-full p-4 bg-gray-100">
        <ProfileDetailsClient handle={handle} />
      </div>
    </Layout>
  );
}
