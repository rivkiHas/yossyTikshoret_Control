
import { cn } from '@/lib/utils'
import { Tabs } from './desktop/tabs'
import useIsMobile from '../hooks/useIsMobile';
import HoursOpen from './mobile/hours_open_mobile';
import { MobileTabs } from './mobile/mobile_tab';

export function RegisterCard({ className, ...props }) {

  const isMobile = useIsMobile();

  return (
    // isMobile ? (
    //   <MobileTabs/>
    // ) : (
    //   <div className={cn('flex space-x-[28px]', className)} {...props}>
        <Tabs />
      // </div>
    // )
  );
}
