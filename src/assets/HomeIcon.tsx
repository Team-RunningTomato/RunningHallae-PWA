interface HomeIconProps {
  isFill: boolean;
}

const HomeIcon = ({ isFill }: HomeIconProps) => (
  <svg
    width='1.5rem'
    height='1.5rem'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    {isFill ? (
      <>
        <path
          d='M6.133 21C4.955 21 4 20.02 4 18.81V10.008C4 9.34303 4.295 8.71303 4.8 8.29803L10.667 3.48003C11.0419 3.16961 11.5133 2.99976 12 2.99976C12.4867 2.99976 12.9581 3.16961 13.333 3.48003L19.199 8.29803C19.705 8.71303 20 9.34303 20 10.008V18.81C20 20.02 19.045 21 17.867 21H6.133Z'
          fill='#1C1C1C'
          stroke='#1C1C1C'
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M9.5 21V15.5C9.5 14.9696 9.71071 14.4609 10.0858 14.0858C10.4609 13.7107 10.9696 13.5 11.5 13.5H12.5C13.0304 13.5 13.5391 13.7107 13.9142 14.0858C14.2893 14.4609 14.5 14.9696 14.5 15.5V21'
          fill='#fff'
          stroke='#1C1C1C'
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </>
    ) : (
      <>
        <path
          d='M6.133 21C4.955 21 4 20.02 4 18.81V10.008C4 9.34303 4.295 8.71303 4.8 8.29803L10.667 3.48003C11.0419 3.16961 11.5133 2.99976 12 2.99976C12.4867 2.99976 12.9581 3.16961 13.333 3.48003L19.199 8.29803C19.705 8.71303 20 9.34303 20 10.008V18.81C20 20.02 19.045 21 17.867 21H6.133Z'
          stroke='#555555'
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M9.5 21V15.5C9.5 14.9696 9.71071 14.4609 10.0858 14.0858C10.4609 13.7107 10.9696 13.5 11.5 13.5H12.5C13.0304 13.5 13.5391 13.7107 13.9142 14.0858C14.2893 14.4609 14.5 14.9696 14.5 15.5V21'
          stroke='#555555'
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </>
    )}
  </svg>
);

export default HomeIcon;
