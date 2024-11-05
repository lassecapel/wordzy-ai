-- Add fork_count column to word_lists
alter table public.word_lists
add column fork_count integer default 0;

-- Create function to increment fork count
create or replace function increment_fork_count(list_id uuid)
returns void as $$
begin
  update public.word_lists
  set fork_count = fork_count + 1
  where id = list_id;
end;
$$ language plpgsql security definer;

-- Grant execute permission to authenticated users
grant execute on function increment_fork_count to authenticated;