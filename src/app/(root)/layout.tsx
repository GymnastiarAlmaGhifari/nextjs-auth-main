import Navbar from '@/components/shared/Navbar';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Provider from '@/components/providers/auth-provider';
import { SocketProvider } from '@/components/providers/socket-provider';
import Topbar from '@/components/shared/Topbar';
import Leftsidebar from '@/components/shared/Leftsidebar';
import Rightsidebar from '@/components/shared/Rightsidebar';
import Bottombar from '@/components/shared/Bottombar';
import { QueryProvider } from '@/components/providers/query-provider';
import { ModalProvider } from '@/components/providers/modal-provider';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const session = await getServerSession(authOptions)


    return (
        <Provider session={session}>
            <html lang='en'>
                <body className={inter.className}>
                    <Topbar />
                    <main className='flex flex-row'>
                        <Leftsidebar />
                        <section className='main-container'>
                            <div className='w-full max-w-4xl'>
                                <SocketProvider>
                                    <QueryProvider>
                                        <ModalProvider />
                                        {children}
                                    </QueryProvider>
                                </SocketProvider>
                            </div>
                        </section>
                        <Rightsidebar />
                    </main>
                    <Bottombar />
                </body>
            </html>
        </Provider>
    );
}

// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//     title: 'Create Next App',
//     description: 'Generated by create next app',
// };

// export default async function RootLayout({
//     children,
// }: {
//     children: React.ReactNode;
// }) {

//     const session = await getServerSession(authOptions)

//     return (
//         <Provider session={session}>
//             <html lang='en'>
//                 <body className={inter.className}>
//                     <Topbar />
//                     <main className='flex flex-row'>
//                         {/* <Leftsidebar /> */}
//                         <section className='main-container'>
//                             <div className='w-full max-w-4xl'>
//                                 <SocketProvider>
//                                     <QueryProvider>
//                                         <ModalProvider />
//                                         {children}
//                                     </QueryProvider>
//                                 </SocketProvider>
//                             </div>
//                         </section>
//                         {/* <Rightsidebar /> */}
//                     </main>
//                     <Bottombar />
//                 </body>
//             </html>
//         </Provider>
//     );
// }
