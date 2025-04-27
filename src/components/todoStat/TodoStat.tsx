import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/utils/styles';

type TodoStat = {
  title: string;
  value: number;
  titleClassName?: string;
};

type TodoStatProps = {
  stat: TodoStat;
};

export function TodoStat({
  stat: { title, value, titleClassName },
}: TodoStatProps) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle
          className={cn(
            'lg:text-5xl md:text-4xl text-2xl font-semibold tabular-nums',
            titleClassName,
          )}
        >
          {value}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
