import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { isSubject, getData, Subject, getTitle } from "@/app/domain/subject";
import ManageSubjects from "@/app/components/ManageSubjects";

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  if (!isSubject(subject)) {
    notFound();
  }
  const prisma = new PrismaClient();
  const knownPath: Subject = subject as Subject;
  const data = JSON.parse(
    JSON.stringify(await getData[knownPath](prisma))
  ) as string[];

  return (
    <DashboardLayout>
      <ManageSubjects type={subject} initialData={data} title={getTitle[subject]} />
    </DashboardLayout>
  );
}
