import SideBar from "@/components/SideBar";

export default function AdminLayout({ children }: any) {
  return (
    <div className="h-full">
      <div className="mt-10 md:mt-16 w-full block md:flex">
        <div className="w-full md:w-1/4 ">
          <SideBar />
        </div>
        <main className="mt-5 p-2 md:w-3/4">{children}</main>
      </div>
    </div>
  );
}
