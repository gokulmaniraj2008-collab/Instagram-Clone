import { supabase, hasSupabase } from '../supabase';

export async function getCurrentSession() {
  if (!hasSupabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export function watchAuth(callback) {
  if (!hasSupabase) return () => {};
  const { data } = supabase.auth.onAuthStateChange((_event, session) => callback(session));
  return () => data.subscription.unsubscribe();
}

export async function signIn(email, password) {
  if (!hasSupabase) throw new Error('Supabase is not configured');
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signUp(email, password, username) {
  if (!hasSupabase) throw new Error('Supabase is not configured');
  return supabase.auth.signUp({ email, password, options: { data: { username } } });
}

export async function signOut() {
  if (!hasSupabase) return;
  return supabase.auth.signOut();
}

export async function getProfile(userId) {
  if (!hasSupabase) return null;
  const { data } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle();
  return data;
}

export async function getPosts(limit = 30) {
  if (!hasSupabase) return [];
  const { data, error } = await supabase
    .from('posts')
    .select('id,image_url,caption,created_at,profiles(username,avatar_url)')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data || [];
}

export async function likePost(postId, userId) {
  return supabase.from('likes').insert({ post_id: postId, user_id: userId });
}

export async function unlikePost(postId, userId) {
  return supabase.from('likes').delete().eq('post_id', postId).eq('user_id', userId);
}

export async function followUser(followerId, followingId) {
  return supabase.from('follows').insert({ follower_id: followerId, following_id: followingId });
}

export async function unfollowUser(followerId, followingId) {
  return supabase.from('follows').delete().eq('follower_id', followerId).eq('following_id', followingId);
}
