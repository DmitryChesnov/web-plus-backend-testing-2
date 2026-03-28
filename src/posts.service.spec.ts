import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      {text: 'Post 1'},
      {text: 'Post 2'},
      {text: 'Post 3'},
      {text: 'Post 4'},
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      const result = postsService.findMany();
      
      expect(result).toHaveLength(4);
      expect(result[0].text).toBe('Post 1');
      expect(result[1].text).toBe('Post 2');
      expect(result[2].text).toBe('Post 3');
      expect(result[3].text).toBe('Post 4');
    });

    it('should return correct posts for skip and limit options', () => {
      const result = postsService.findMany({ skip: 1, limit: 2 });
      
      expect(result).toHaveLength(2);
      expect(result[0].text).toBe('Post 2');
      expect(result[1].text).toBe('Post 3');
    });

    it('should return posts from the beginning when only limit is provided', () => {
      const result = postsService.findMany({ limit: 3 });
      
      expect(result).toHaveLength(3);
      expect(result[0].text).toBe('Post 1');
      expect(result[1].text).toBe('Post 2');
      expect(result[2].text).toBe('Post 3');
    });

    it('should skip specified number of posts when only skip is provided', () => {
      const result = postsService.findMany({ skip: 2 });
      
      expect(result).toHaveLength(2);
      expect(result[0].text).toBe('Post 3');
      expect(result[1].text).toBe('Post 4');
    });

    it('should return empty array when skip exceeds total posts count', () => {
      const result = postsService.findMany({ skip: 10 });
      
      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });

    it('should return remaining posts when limit exceeds available posts', () => {
      const result = postsService.findMany({ skip: 2, limit: 10 });
      
      expect(result).toHaveLength(2);
      expect(result[0].text).toBe('Post 3');
      expect(result[1].text).toBe('Post 4');
    });

    it('should return empty array when both skip and limit are zero', () => {
      const result = postsService.findMany({ skip: 0, limit: 0 });
      
      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });

    it('should not modify original posts array', () => {
      const originalPosts = postsService.findMany();
      const result = postsService.findMany({ skip: 1, limit: 1 });
      
      expect(originalPosts).toHaveLength(4);
      expect(result).toHaveLength(1);
      expect(originalPosts[0].text).toBe('Post 1');
      expect(result[0].text).toBe('Post 2');
    });
  });
});