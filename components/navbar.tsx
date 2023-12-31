import { UserButton } from '@clerk/nextjs';

import { getApiLimitCount } from '@/lib/api-limit';
import MobileSidebar from './mobile-sidebar';

const Navbar = async () => {
  const apiLimitCount = await getApiLimitCount();

  return (
    <div className="flex items-center p-4">
      <MobileSidebar apiLimitCount={apiLimitCount} />

      <div className="flex justify-end w-full">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
