export default {
  items: [
    {
      name: 'Cityray',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
        title: true,
        name: 'Test',
        wrapper: {
          element: '',
          attributes: {},
        },
      },
      {
        name: 'Job Req',
        url: '/jobRequisition',
        icon: 'icon-puzzle',
        children: [
          {
            name: 'New Apply',
            url: '/jobRequisition/newApply',
            icon: 'icon-star',
          },
          {
            name: 'Pending Approval',
            url: '/jobRequisition/pendingApproval',
            icon: 'icon-star',
            badge: {
                variant: 'info',
                text: '10+',
              }
          },
          {
            name: 'List of Approved Job',
            url: '/jobRequisition/listOfApprovedJob',
            icon: 'icon-star',
          },
        ],
      },
  	{
        name: 'Approver',
        url: '/approver',
        icon: 'icon-puzzle',
        children: [
          {
            name: 'Job Requisition',
            url: '/approver/jobRequisition',
            icon: 'icon-star',
          },
          {
            name: 'Extra-Hours',
            url: '/approver/extraHours',
            icon: 'icon-star',
          },
        ],
      },
  	{
        name: 'Maintenance',
        url: '/maintenance',
        icon: 'icon-puzzle',
        children: [
          {
            name: 'Casual Staff Master',
            url: '/maintenance/casualStaffMaster',
            icon: 'icon-star',
          },
          {
            name: 'Hourly Rate Master',
            url: '/maintenance/hourlyRateMaster',
            icon: 'icon-star',
          },
  		{
            name: 'Approvers Group Master',
            url: '/maintenance/approversGroupMaster',
            icon: 'icon-star',
          },
  		{
            name: 'Assign Approver to Group',
            url: '/maintenance/assignApproverToGroup',
            icon: 'icon-star',
          },
  		{
            name: 'Department Profile',
            url: '/maintenance/departmentProfile',
            icon: 'icon-star',
          },
  		{
            name: 'System Parameters',
            url: '/maintenance/systemParameters',
            icon: 'icon-star',
          },
        ],
      },
  	{
        name: 'iHRPlus System',
        url: '/iHRPlusSystem',
        icon: 'icon-puzzle',
        children: [
          {
            name: 'Org. Structure Module',
            url: '/iHRPlusSystem/orgStructureModule',
            icon: 'icon-star',
          },
          {
            name: 'Payroll Module',
            url: '/iHRPlusSystem/payrollModule',
            icon: 'icon-star',
          },
  		{
            name: 'MPF Module',
            url: '/iHRPlusSystem/mpfModule',
            icon: 'icon-star',
          },
  		{
            name: 'AutoPay Module',
            url: '/iHRPlusSystem/autoPayModule',
            icon: 'icon-star',
          },
  		{
            name: 'Taxation Module',
            url: '/iHRPlusSystem/taxationModule',
            icon: 'icon-star',
          },
  		{
            name: 'Security Module',
            url: '/iHRPlusSystem/securityModule',
            icon: 'icon-star',
          },
        ],
      },
    {
      title: true,
      name: 'Theme',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Colors',
      url: '/theme/colors',
      icon: 'icon-drop',
    },
    {
      name: 'Typography',
      url: '/theme/typography',
      icon: 'icon-pencil',
    },
    {
      title: true,
      name: 'Components',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Base',
      url: '/base',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Breadcrumbs',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Cards',
          url: '/base/cards',
          icon: 'icon-puzzle',
        },
        {
          name: 'Carousels',
          url: '/base/carousels',
          icon: 'icon-puzzle',
        },
        {
          name: 'Collapses',
          url: '/base/collapses',
          icon: 'icon-puzzle',
        },
        {
          name: 'Dropdowns',
          url: '/base/dropdowns',
          icon: 'icon-puzzle',
        },
        {
          name: 'Forms',
          url: '/base/forms',
          icon: 'icon-puzzle',
        },
        {
          name: 'Jumbotrons',
          url: '/base/jumbotrons',
          icon: 'icon-puzzle',
        },
        {
          name: 'List groups',
          url: '/base/list-groups',
          icon: 'icon-puzzle',
        },
        {
          name: 'Navs',
          url: '/base/navs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Paginations',
          url: '/base/paginations',
          icon: 'icon-puzzle',
        },
        {
          name: 'Popovers',
          url: '/base/popovers',
          icon: 'icon-puzzle',
        },
        {
          name: 'Progress Bar',
          url: '/base/progress-bar',
          icon: 'icon-puzzle',
        },
        {
          name: 'Switches',
          url: '/base/switches',
          icon: 'icon-puzzle',
        },
        {
          name: 'Tables',
          url: '/base/tables',
          icon: 'icon-puzzle',
        },
        {
          name: 'Tabs',
          url: '/base/tabs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Tooltips',
          url: '/base/tooltips',
          icon: 'icon-puzzle',
        },
      ],
    },
    {
      name: 'Buttons',
      url: '/buttons',
      icon: 'icon-cursor',
      children: [
        {
          name: 'Buttons',
          url: '/buttons/buttons',
          icon: 'icon-cursor',
        },
        {
          name: 'Button dropdowns',
          url: '/buttons/button-dropdowns',
          icon: 'icon-cursor',
        },
        {
          name: 'Button groups',
          url: '/buttons/button-groups',
          icon: 'icon-cursor',
        },
        {
          name: 'Brand Buttons',
          url: '/buttons/brand-buttons',
          icon: 'icon-cursor',
        },
      ],
    },
    {
      name: 'Charts',
      url: '/charts',
      icon: 'icon-pie-chart',
    },
    {
      name: 'Icons',
      url: '/icons',
      icon: 'icon-star',
      children: [
        {
          name: 'CoreUI Icons',
          url: '/icons/coreui-icons',
          icon: 'icon-star',
          badge: {
            variant: 'info',
            text: 'NEW',
          },
        },
        {
          name: 'Flags',
          url: '/icons/flags',
          icon: 'icon-star',
        },
        {
          name: 'Font Awesome',
          url: '/icons/font-awesome',
          icon: 'icon-star',
          badge: {
            variant: 'secondary',
            text: '4.7',
          },
        },
        {
          name: 'Simple Line Icons',
          url: '/icons/simple-line-icons',
          icon: 'icon-star',
        },
      ],
    },
    {
      name: 'Notifications',
      url: '/notifications',
      icon: 'icon-bell',
      children: [
        {
          name: 'Alerts',
          url: '/notifications/alerts',
          icon: 'icon-bell',
        },
        {
          name: 'Badges',
          url: '/notifications/badges',
          icon: 'icon-bell',
        },
        {
          name: 'Modals',
          url: '/notifications/modals',
          icon: 'icon-bell',
        },
      ],
    },
    {
      name: 'Widgets',
      url: '/widgets',
      icon: 'icon-calculator',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      divider: true,
    },
    {
      title: true,
      name: 'Extras',
    },
    {
      name: 'Pages',
      url: '/pages',
      icon: 'icon-star',
      children: [
        {
          name: 'Login',
          url: '/login',
          icon: 'icon-star',
        },
        {
          name: 'Register',
          url: '/register',
          icon: 'icon-star',
        },
        {
          name: 'Error 404',
          url: '/404',
          icon: 'icon-star',
        },
        {
          name: 'Error 500',
          url: '/500',
          icon: 'icon-star',
        },
      ],
    },
  ],
};
