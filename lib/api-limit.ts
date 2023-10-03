import { MAX_FREE_COUNTS } from '@/constants';
import { auth } from '@clerk/nextjs';

import prismadb from './prismadb';

const checkUser = () => {
  const { userId } = auth();

  if (!userId) return;

  return userId;
};

const userId = checkUser() as string;

export const increaseApiLimit = async () => {
  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  });

  if (userApiLimit)
    await prismadb.userApiLimit.update({
      where: { userId },
      data: { count: userApiLimit.count + 1 },
    });

  await prismadb.userApiLimit.create({ data: { userId, count: 1 } });
};

export const checkApiLimit = async () => {
  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  });

  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) return true;

  return false;
};
