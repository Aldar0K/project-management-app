import React from 'react';
import { IconTypes } from 'models/types';
import { COLOR_PRIMARY, COLOR_ERROR, COLOR_SUCCESS } from '../../../constants';

interface IconProps {
  type: IconTypes;
  width?: string;
  height?: string;
  color?: string;
}

const Icon: React.FC<IconProps> = ({ type, width, height = width, color = COLOR_PRIMARY }) => {
  switch (type) {
    case 'share':
      return (
        <svg
          width={!!width ? width : 8}
          height={!!height ? height : 8}
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_34_228)">
            <path
              d="M6.55433 0C5.75592 0 5.10868 0.647255 5.10868 1.44565C5.10868 1.47937 5.1114 1.5124 5.1138 1.54551L2.44328 2.79891C2.18377 2.55094 1.83289 2.39783 1.44566 2.39783C0.647254 2.39785 0 3.0451 0 3.84349C0 4.6419 0.647254 5.28914 1.44565 5.28914C1.69751 5.28914 1.93428 5.22443 2.14044 5.11124L3.29636 6.08525C3.24574 6.2326 3.21704 6.38995 3.21704 6.55435C3.21704 7.35276 3.86429 8 4.66269 8C5.46111 8 6.10833 7.35275 6.10833 6.55435C6.10833 5.75596 5.4611 5.1087 4.66269 5.1087C4.41084 5.1087 4.17408 5.17343 3.96788 5.28659L2.81197 4.3126C2.86261 4.16533 2.89129 4.0079 2.89129 3.84349C2.89129 3.80979 2.88858 3.77684 2.88619 3.74364L5.5567 2.49024C5.81621 2.7382 6.16708 2.89131 6.5543 2.89131C7.35269 2.89131 7.99994 2.24406 7.99994 1.44566C7.99994 0.647271 7.35272 0 6.55433 0Z"
              fill={color}
            />
          </g>
          <defs>
            <clipPath id="clip0_34_228">
              <rect width="7.99994" height="8" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    case 'add-cross':
      return (
        <svg
          width={!!width ? width : 8}
          height={!!height ? height : 8}
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_36_136)">
            <path d="M4.75 0H3.25V8H4.75V0Z" fill={color} />
            <path d="M8 4.75V3.25L0 3.25V4.75H8Z" fill={color} />
          </g>
          <defs>
            <clipPath id="clip0_36_136">
              <rect width="8" height="8" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    case 'check-case':
      return (
        <svg
          width={!!width ? width : 8}
          height={!!height ? height : 8}
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_36_383)">
            <g clipPath="url(#clip1_36_383)">
              <path
                d="M0.666667 0.666667C0.1 1.23333 0 1.76667 0 4C0 6.23333 0.1 6.76667 0.666667 7.33333C1.23333 7.9 1.76667 8 4 8C7.63333 8 8 7.63333 8 4C8 1.76667 7.9 1.23333 7.33333 0.666667C6.76667 0.0999994 6.23333 0 4 0C1.76667 0 1.23333 0.0999994 0.666667 0.666667ZM6.93333 1.06667C7.46667 1.6 7.46667 6.4 6.93333 6.93333C6.7 7.16667 5.53333 7.33333 4 7.33333C2.46667 7.33333 1.3 7.16667 1.06667 6.93333C0.533333 6.4 0.533333 1.6 1.06667 1.06667C1.6 0.533333 6.4 0.533333 6.93333 1.06667Z"
                fill={color}
              />
              <path
                d="M4.43331 3.73333C3.56665 4.6 3.29998 4.7 2.86665 4.36667C2.13331 3.73333 1.93331 4.5 2.66665 5.16667C3.33331 5.76667 3.39998 5.76667 4.66665 4.5C5.93331 3.23333 6.29998 2.66667 5.73331 2.66667C5.59998 2.66667 4.99998 3.13333 4.43331 3.73333Z"
                fill={color}
              />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_36_383">
              <rect width="7.99994" height="8" fill="white" />
            </clipPath>
            <clipPath id="clip1_36_383">
              <rect width="8" height="8" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    case 'error':
      return (
        <svg
          width={!!width ? width : 16}
          height={!!height ? height : 17}
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="0.5"
            width="16"
            height="16"
            rx="8"
            fill={color !== COLOR_PRIMARY ? color : COLOR_ERROR}
          />
          <path
            d="M7.484 10.432C7.42 10.432 7.376 10.424 7.352 10.408C7.336 10.392 7.328 10.34 7.328 10.252L7.136 5.08C7.136 5.024 7.144 4.984 7.16 4.96C7.176 4.936 7.212 4.924 7.268 4.924H8.696C8.784 4.924 8.828 4.972 8.828 5.068L8.624 10.252C8.624 10.332 8.616 10.384 8.6 10.408C8.584 10.424 8.532 10.432 8.444 10.432H7.484ZM8.708 12.556C8.708 12.764 8.656 12.924 8.552 13.036C8.456 13.148 8.248 13.204 7.928 13.204C7.648 13.204 7.444 13.148 7.316 13.036C7.196 12.924 7.136 12.764 7.136 12.556C7.136 12.348 7.196 12.192 7.316 12.088C7.444 11.976 7.648 11.92 7.928 11.92C8.248 11.92 8.456 11.976 8.552 12.088C8.656 12.192 8.708 12.348 8.708 12.556Z"
            fill="#F5F1EF"
          />
        </svg>
      );
    case 'success':
      return (
        <svg
          width={!!width ? width : 16}
          height={!!height ? height : 17}
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="0.5"
            width="16"
            height="16"
            rx="8"
            fill={color !== COLOR_PRIMARY ? color : COLOR_SUCCESS}
          />
          <path d="M3.755 8.5L6.58501 11.33L12.245 5.67" stroke="#F5F1EF" strokeMiterlimit="10" />
        </svg>
      );
    case 'dot-menu':
      return (
        <svg
          width={!!width ? width : 11}
          height={!!height ? height : 3}
          viewBox="0 0 11 3"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_36_194)">
            <path
              d="M1.5 3C2.32843 3 3 2.32843 3 1.5C3 0.671573 2.32843 0 1.5 0C0.671573 0 0 0.671573 0 1.5C0 2.32843 0.671573 3 1.5 3Z"
              fill={color}
            />
            <path
              d="M5.5 3C6.32843 3 7 2.32843 7 1.5C7 0.671573 6.32843 0 5.5 0C4.67157 0 4 0.671573 4 1.5C4 2.32843 4.67157 3 5.5 3Z"
              fill={color}
            />
            <path
              d="M9.5 3C10.3284 3 11 2.32843 11 1.5C11 0.671573 10.3284 0 9.5 0C8.67157 0 8 0.671573 8 1.5C8 2.32843 8.67157 3 9.5 3Z"
              fill={color}
            />
          </g>
          <defs>
            <clipPath id="clip0_36_194">
              <rect width="11" height="3" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    case 'password-show':
      return (
        <svg
          width={!!width ? width : 12}
          height={!!height ? height : 9}
          viewBox="0 0 12 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_30_32)">
            <path
              d="M6.00004 7.78C9.01551 7.78 11.46 6.15032 11.46 4.14C11.46 2.12968 9.01551 0.5 6.00004 0.5C2.98456 0.5 0.540039 2.12968 0.540039 4.14C0.540039 6.15032 2.98456 7.78 6.00004 7.78Z"
              stroke={color}
              strokeMiterlimit="10"
            />
            <path
              d="M6.00007 5.81999C6.92791 5.81999 7.68007 5.06783 7.68007 4.13999C7.68007 3.21215 6.92791 2.45999 6.00007 2.45999C5.07223 2.45999 4.32007 3.21215 4.32007 4.13999C4.32007 5.06783 5.07223 5.81999 6.00007 5.81999Z"
              stroke={color}
              strokeMiterlimit="10"
            />
          </g>
          <defs>
            <clipPath id="clip0_30_32">
              <rect width="12" height="8.28" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    case 'password-hide':
      return (
        <svg
          width={!!width ? width : 12}
          height={!!height ? height : 10}
          viewBox="0 0 12 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_30_34)">
            <path
              d="M5.72727 8.24676C8.33807 8.24676 10.4545 6.83577 10.4545 5.09524C10.4545 3.35471 8.33807 1.94373 5.72727 1.94373C3.11647 1.94373 1 3.35471 1 5.09524C1 6.83577 3.11647 8.24676 5.72727 8.24676Z"
              stroke={color}
              strokeMiterlimit="10"
            />
            <path d="M1.83105 9L9.83105 1" stroke={color} strokeMiterlimit="10" />
          </g>
          <defs>
            <clipPath id="clip0_30_34">
              <rect width="12" height="9.94" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    case 'logo':
      return (
        <svg
          width={!!width ? width : 16}
          height={!!height ? height : 18}
          viewBox="0 0 16 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="16" height="18" rx="4" fill="#def5ff" />
          <path d="M3 3H7V15H3V3Z" fill={color} />
          <path d="M9 3H13V11H9V3Z" fill={color} />
        </svg>
      );
    default:
      return null;
  }
};

export default Icon;
