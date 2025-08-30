import React from 'react'
import { formatAmount } from '@/lib/utils';
import CountUp from 'react-countup';
import AnimatedCounter from './AnimatedCounter';
import DoughnutChart from './DoughnutChart';

const TotalBalanceBox = ({
    accounts = [], totalBanks, totalCurrentBalance
}: TotlaBalanceBoxProps) => {
    return (
        <div>
            <section className='!total-balance'>
                <div className='total-balance-chart'>
                    <DoughnutChart accounts={accounts}/>
                </div>
                <div className='flex flex-col gap-6'>
                    <p className='header-2'>
                        Bank Accounts: {totalBanks}
                    </p>
                    <div className='flex flex-col gap-2'>
                        <p className='total-balance-label'>
                            Total Current Balance
                        </p>
                        <p className='total-balance-amount flex-center gap-2'>
                            <AnimatedCounter amount={totalCurrentBalance} />
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default TotalBalanceBox
