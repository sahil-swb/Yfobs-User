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
                    icon: 'fa fa-shopping-cart'
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
                },
                {
                    id: 'expense',
                    title: 'Expense',
                    type: 'item',
                    url: '/expense',
                    classes: 'nav-item',
                    icon: 'fa fa-cubes'
                },
                {
                    id: 'vendors',
                    title: 'Vendors',
                    type: 'item',
                    url: '/vendors',
                    classes: 'nav-item',
                    icon: 'fa fa-users'
                },
                {
                    id: 'reports',
                    title: 'Reports',
                    type: 'item',
                    url: '/reports',
                    classes: 'nav-item',
                    icon: 'fa fa-bar-chart'
                },
                {
                    id: 'subscription',
                    title: 'Subscription',
                    type: 'item',
                    url: '/subscription',
                    icon: 'fa fa-calculator'
                },
                {
                    id: 'user_change_password',
                    title: 'Change Password',
                    type: 'item',
                    url: '/user_change_password',
                    icon: 'fa fa-key'
                },
                {
                    id: 'gst_calculate',
                    title: 'GST Calculate',
                    type: 'item',
                    url: '/gst_calculate',
                    icon: 'fa fa-calculator'
                }
            ]
        }
    ]
};
export default chartData;
