import React from 'react';
import ICustomIconProps from './ICustomIconProps';

const SettingsGearIcon: React.FC<ICustomIconProps> = props => (
    <svg {...props} version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <g>
        <path
            d="M27.2,10.4L29,6.4l-3.5-3.5l-3.9,1.9l-1.7-0.7L18.4,0h-4.9l-1.5,4.1l-1.7,0.7L6.4,2.9L2.9,6.4l1.9,3.9l-0.7,1.7L0,13.5v4.9
		l4.1,1.5l0.7,1.7l-1.9,3.9l3.5,3.5l3.9-1.9l1.7,0.7l1.5,4.1h4.9l1.5-4.1l1.7-0.7l3.9,1.9l3.5-3.5l-1.9-3.9l0.7-1.7l4.1-1.5v-4.9
		l-4.1-1.5L27.2,10.4z M30,17l-3.2,1.1l-0.4,0.2L25,21.7l1.6,3.5l-1.5,1.5L21.7,25l-3.4,1.4L17,30h-2.1l-1.3-3.6L10.3,25l-3.4,1.6
		l-1.5-1.5L7,21.7l-1.4-3.4L2,17V15l3.2-1.1l0.4-0.2L7,10.3L5.4,6.8l1.5-1.5L10.3,7l3.4-1.4L14.9,2H17l1.3,3.6L21.7,7l3.4-1.6
		l1.5,1.5L25,10.3l1.4,3.4L30,15L30,17z"
        />
        <path
            d="M16,10c-3.3,0-6,2.7-6,6s2.7,6,6,6s6-2.7,6-6C22,12.7,19.3,10,16,10z M16,20c-2.2,0-4-1.8-4-4s1.8-4,4-4s4,1.8,4,4
		C20,18.2,18.2,20,16,20z"
        />
      </g>
    </svg>
);

export default SettingsGearIcon;
