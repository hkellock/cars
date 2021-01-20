import { useSnackbar } from 'notistack';

const useNotifications = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const enqueueInfo = (message: string) =>
    enqueueSnackbar(message, { variant: 'info' });

  const enqueueSuccess = (message: string) =>
    enqueueSnackbar(message, { variant: 'success' });

  const enqueueWarning = (message: string) =>
    enqueueSnackbar(message, { variant: 'warning' });

  const enqueueError = (message: string) =>
    enqueueSnackbar(message, { variant: 'error' });

  return {
    closeSnackbar,
    enqueueInfo,
    enqueueSuccess,
    enqueueWarning,
    enqueueError,
  };
};

export default useNotifications;
