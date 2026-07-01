import { LoadingState } from '../components/Loader';

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bgMain">
      <LoadingState label="Loading workspace" />
    </div>
  );
}
