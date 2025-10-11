import React, { useEffect, useRef } from 'react';

const Profile = () => {


    // Data structure for the profile details display
    const PROFILE_DETAILS = [
      { label: 'Full Name', value: 'Jane Cooper' },
      { label: 'Email Address', value: 'jane.cooper@example.com' },
      { label: 'Phone Number', value: '+1 (555) 123-4567' },
      { label: 'Date of Birth', value: 'October 25, 1990' },
      { label: 'Department', value: 'Design' },
      { label: 'Position', value: 'UI/UX Designer' },
      { label: 'Joining Date', value: 'January 15, 2022' },
      {
        label: 'Employment Status',
        value: (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>
        ),
      },
    ];


    return (
        <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {PROFILE_DETAILS.map((detail, index) => (
                <div key={index}>
                    <label className="text-sm font-medium text-subtext-light dark:text-subtext-dark">
                        {detail.label}
                    </label>
                    <p className="mt-1 text-text-light dark:text-text-dark">
                        {detail.value}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Profile;