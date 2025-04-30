<template>
    <AdminLayout>
        <div class="text-4xl font-bold text-gray-800 mb-8 mx-4">Dashboard</div>
        
        <div class="stats shadow w-full mb-8">
            <div class="stat">
                <div class="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-8 w-8 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                    </svg>
                </div>
                <div class="stat-title">Order</div>
                <div class="stat-value">31K</div>
            </div>
            <div class="stat">
                <div class="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-8 w-8 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"></path>
                    </svg>
                </div>
                <div class="stat-title">Product</div>
                <div class="stat-value">4,200</div>
            </div>
            <div class="stat">
                <div class="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-8 w-8 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                    </svg>
                </div>
                <div class="stat-title">User</div>
                <div class="stat-value">1,200</div>
            </div>
        </div>

        <div class="flex flex-wrap gap-8 mb-8 justify-center md:justify-start items-center align-center">
            <!-- Chart 1 -->
            <div class="w-full md:w-[48%]">
                <apexchart width="75%" type="bar" :options="priceChart.options" :series="priceChart.series" />
            </div>

            <!-- Chart 2 -->
            <div class="w-full md:w-[48%]">
                <apexchart width="75%" type="pie" :options="categoriesChart.chartOptions" :series="categoriesChart.series" />
            </div>

            <!-- Chart 3 -->
            <div class="w-full md:w-[48%]">
                <apexchart width="75%" type="line" :options="salesChart.options" :series="salesChart.series" />
            </div>

            <!-- Chart 4 -->
            <div class="w-full md:w-[48%]">
                <apexchart width="75%" type="bar" :options="bestSellingChart.options" :series="bestSellingChart.series" />
            </div>
        </div>

    </AdminLayout>
</template>


<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue';

const priceChart = {
    options: {
        chart: { id: 'vuechart-example' },
        xaxis: { categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998] }
    },
    series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
    }]
};

const categoriesChart = {
    chartOptions: {
        chart: { width: 380, type: 'pie' },
        labels: ['Shirts', 'Pants', 'Shoes', 'Accessories', 'Others'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: { width: 200 },
                legend: { position: 'bottom' }
            }
        }]
    },
    series: [44, 55, 13, 43, 22]
};

const salesChart = {
    options: {
        chart: { id: 'line-chart' },
        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] }
    },
    series: [{
        name: 'Sales',
        data: [400, 420, 500, 470, 600, 630, 710]
    }]
};

const bestSellingChart = {
    options: {
        chart: { id: 'horizontal-bar-chart', type: 'bar' },
        plotOptions: { bar: { horizontal: true } },
        xaxis: { categories: ['Shirts', 'Pants', 'Shoes', 'Accessories'] }
    },
    series: [{
        name: 'Sales',
        data: [1000, 900, 1200, 800]
    }]
};
</script>
