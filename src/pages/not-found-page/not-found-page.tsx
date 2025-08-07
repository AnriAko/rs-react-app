import { ROUTES_PATH } from '~/router/routes-path';
import { useNavigate } from 'react-router';
import { useTheme } from '~/context/theme/theme-context';
import { CustomButton } from '~/ui/custom-button';
import cl from 'classnames';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div
      className={cl(
        'min-h-screen flex items-center justify-center transition-colors duration-300',
        {
          'bg-white text-gray-900': theme === 'light',
          'bg-gray-900 text-white': theme === 'dark',
        }
      )}
    >
      <div className="text-center">
        <p className="text-red-600 font-bold text-2xl">404 - Page Not Found</p>
        <CustomButton
          onClick={() => navigate(ROUTES_PATH.ROOT)}
          classes="mt-6 ml-0"
        >
          Go to Home
        </CustomButton>
      </div>
    </div>
  );
};
