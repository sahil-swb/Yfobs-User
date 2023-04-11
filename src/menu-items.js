const chartData = {
    items: [
        {
            id: 'support',
            title: 'Support',
            type: 'group',
            icon: 'icon-support',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/dashboard',
                    classes: 'nav-item',
                    icon: 'fa fa-home'
                },
                {
                    id: 'customers',
                    title: 'Customers',
                    type: 'item',
                    url: '/customers',
                    classes: 'nav-item',
                    icon: 'fa fa-users'
                },
                {
                    id: 'categories',
                    title: 'Categories',
                    type: 'item',
                    url: '/categories',
                    classes: 'nav-item',
                    icon: 'fa fa-folder-open'
                },
                {
                    id: 'products',
                    title: 'Products',
                    type: 'item',
                    url: '/products',
                    classes: 'nav-item',
                    icon: 'fa fa-cubes'
                },
                {
                    id: 'estimates',
                    title: 'Estimates',
                    type: 'item',
                    url: '/estimates',
                    classes: 'nav-item',
                    icon: 'fa fa-cubes'
                },
                {
                    id: 'invoices',
                    title: 'Invoices',
                    type: 'item',
                    url: '/invoices',
                    classes: 'nav-item',
                    icon: 'fa fa-cubes'
                }
            ]
        }
    ]
};
export default chartData;
