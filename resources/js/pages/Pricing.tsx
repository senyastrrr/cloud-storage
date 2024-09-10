import { PageProps } from '@/types'
import Guest from '@/layouts/GuestLayout'
import { useState } from 'react'
import { PricingCard, PricingHeader, PricingSwitch } from '@/components/pricing'
import ApplicationLogo from '@/components/common/ApplicationLogo'

export default function Pricing() {

    const [isYearly, setIsYearly] = useState(false)
    const togglePricingPeriod = (value: string) => setIsYearly(parseInt(value) === 1)

    const plans = [
        {
            title: "Basic",
            monthlyPrice: 10,
            yearlyPrice: 100,
            description: "Essential features you need to get started",
            features: ["Example Feature Number 1", "Example Feature Number 2", "Example Feature Number 3"],
            actionLabel: "Get Started",
        },
        {
            title: "Pro",
            monthlyPrice: 25,
            yearlyPrice: 250,
            description: "Perfect for owners of small & medium businessess",
            features: ["Example Feature Number 1", "Example Feature Number 2", "Example Feature Number 3"],
            actionLabel: "Get Started",
            popular: true,
        },
        {
            title: "Enterprise",
            price: "Custom",
            description: "Dedicated support and infrastructure to fit your needs",
            features: ["Example Feature Number 1", "Example Feature Number 2", "Example Feature Number 3", "Super Exclusive Feature"],
            actionLabel: "Contact Sales",
            exclusive: true,
        },
    ]
    return (
        <Guest>
            <div className="py-8">
                <PricingHeader title="Pricing Plans" subtitle="Choose the plan that's right for you" />
                <PricingSwitch onSwitch={togglePricingPeriod} />
                <section className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-8 mt-8">
                    {plans.map((plan) => {
                        return <PricingCard key={plan.title} {...plan} isYearly={isYearly} />
                    })}
                </section>
            </div>
        </Guest>
    );
}
