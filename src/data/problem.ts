// File: src/data/problem.ts

export const problems = [
  {
    id: 1,
    slug: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    completed: false,
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
    exampleInput: 'nums = [2,7,11,15], target = 9',
    exampleOutput: '[0,1]',
    starterCode: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // your code here
    }
};`,
  },
  {
    id: 2,
    slug: 'contains-duplicate',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    completed: false,
    description: 'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.',
    exampleInput: 'nums = [1,2,3,1]',
    exampleOutput: 'true',
    starterCode: `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        // your code here
    }
};`,
  },
  {
    id: 3,
    slug: 'valid-anagram',
    title: 'Valid Anagram',
    difficulty: 'Easy',
    completed: false,
    description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.',
    exampleInput: 's = "anagram", t = "nagaram"',
    exampleOutput: 'true',
    starterCode: `class Solution {
public:
    bool isAnagram(string s, string t) {
        // your code here
    }
};`,
  },
  {
    id: 4,
    slug: 'group-anagrams',
    title: 'Group Anagrams',
    difficulty: 'Medium',
    completed: false,
    description: 'Given an array of strings strs, group the anagrams together. You can return the answer in any order.',
    exampleInput: 'strs = ["eat","tea","tan","ate","nat","bat"]',
    exampleOutput: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
    starterCode: `class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        // your code here
    }
};`,
  },
  {
    id: 5,
    slug: 'top-k-frequent-elements',
    title: 'Top K Frequent Elements',
    difficulty: 'Medium',
    completed: false,
    description: 'Given an integer array nums and an integer k, return the k most frequent elements.',
    exampleInput: 'nums = [1,1,1,2,2,3], k = 2',
    exampleOutput: '[1,2]',
    starterCode: `class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        // your code here
    }
};`,
  },
  {
    id: 6,
    slug: 'product-of-array-except-self',
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    completed: false,
    description: 'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].',
    exampleInput: 'nums = [1,2,3,4]',
    exampleOutput: '[24,12,8,6]',
    starterCode: `class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        // your code here
    }
};`,
  },
  {
    id: 7,
    slug: 'valid-sudoku',
    title: 'Valid Sudoku',
    difficulty: 'Medium',
    completed: false,
    description: 'Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated.',
    exampleInput: 'board = [["5","3",".",".","7",".",".",".","."], ...]',
    exampleOutput: 'true',
    starterCode: `class Solution {
public:
    bool isValidSudoku(vector<vector<char>>& board) {
        // your code here
    }
};`,
  },
  {
    id: 8,
    slug: 'longest-consecutive-sequence',
    title: 'Longest Consecutive Sequence',
    difficulty: 'Medium',
    completed: false,
    description: 'Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.',
    exampleInput: 'nums = [100,4,200,1,3,2]',
    exampleOutput: '4',
    starterCode: `class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        // your code here
    }
};`,
  },
  {
    id: 9,
    slug: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    completed: false,
    description: 'Given n non-negative integers representing an elevation map, compute how much water it can trap after raining.',
    exampleInput: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
    exampleOutput: '6',
    starterCode: `class Solution {
public:
    int trap(vector<int>& height) {
        // your code here
    }
};`,
  },

  {
    id: 10,
    slug: 'valid-palindrome',
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    completed: false,
    description: 'Given a string s, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.',
    exampleInput: 's = "A man, a plan, a canal: Panama"',
    exampleOutput: 'true',
    starterCode: `class Solution {
public:
    bool isPalindrome(string s) {
        // your code here
    }
};`,
  },
  {
    id: 11,
    slug: 'two-sum-ii-input-array-is-sorted',
    title: 'Two Sum II - Input Array Is Sorted',
    difficulty: 'Medium',
    completed: false,
    description: 'Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers that add up to a target number.',
    exampleInput: 'numbers = [2,7,11,15], target = 9',
    exampleOutput: '[1,2]',
    starterCode: `class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        // your code here
    }
};`,
  },
  {
    id: 12,
    slug: '3sum',
    title: '3Sum',
    difficulty: 'Medium',
    completed: false,
    description: 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i ≠ j, i ≠ k, and j ≠ k, and nums[i] + nums[j] + nums[k] == 0.',
    exampleInput: 'nums = [-1,0,1,2,-1,-4]',
    exampleOutput: '[[-1,-1,2],[-1,0,1]]',
    starterCode: `class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        // your code here
    }
};`,
  },
  {
    id: 13,
    slug: 'container-with-most-water',
    title: 'Container With Most Water',
    difficulty: 'Medium',
    completed: false,
    description: 'Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of the line i is at (i, ai) and (i, 0). Find two lines which together with the x-axis forms a container, such that the container contains the most water.',
    exampleInput: 'height = [1,8,6,2,5,4,8,3,7]',
    exampleOutput: '49',
    starterCode: `class Solution {
public:
    int maxArea(vector<int>& height) {
        // your code here
    }
};`,
  },
  {
    id: 14,
    slug: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    completed: false,
    description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    exampleInput: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
    exampleOutput: '6',
    starterCode: `class Solution {
public:
    int trap(vector<int>& height) {
        // your code here
    }
};`,
  },
  {
    id: 15,
    slug: 'best-time-to-buy-and-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    completed: false,
    description: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. Return the maximum profit you can achieve.',
    exampleInput: 'prices = [7,1,5,3,6,4]',
    exampleOutput: '5',
    starterCode: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        // your code here
    }
};`,
  },
  {
    id: 16,
    slug: 'longest-substring-without-repeating-characters',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    completed: false,
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    exampleInput: 's = "abcabcbb"',
    exampleOutput: '3',
    starterCode: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        // your code here
    }
};`,
  },
  {
    id: 17,
    slug: 'longest-repeating-character-replacement',
    title: 'Longest Repeating Character Replacement',
    difficulty: 'Medium',
    completed: false,
    description: 'You are given a string s and an integer k. Return the length of the longest substring containing the same letter you can get after performing at most k character replacements.',
    exampleInput: 's = "ABAB", k = 2',
    exampleOutput: '4',
    starterCode: `class Solution {
public:
    int characterReplacement(string s, int k) {
        // your code here
    }
};`,
  },
  {
    id: 18,
    slug: 'permutation-in-string',
    title: 'Permutation in String',
    difficulty: 'Medium',
    completed: false,
    description: 'Given two strings s1 and s2, return true if s2 contains a permutation of s1.',
    exampleInput: 's1 = "ab", s2 = "eidbaooo"',
    exampleOutput: 'true',
    starterCode: `class Solution {
public:
    bool checkInclusion(string s1, string s2) {
        // your code here
    }
};`,
  },
  {
    id: 19,
    slug: 'minimum-window-substring',
    title: 'Minimum Window Substring',
    difficulty: 'Hard',
    completed: false,
    description: 'Given two strings s and t, return the minimum window in s which will contain all the characters in t.',
    exampleInput: 's = "ADOBECODEBANC", t = "ABC"',
    exampleOutput: '"BANC"',
    starterCode: `class Solution {
public:
    string minWindow(string s, string t) {
        // your code here
    }
};`,
  },
  {
    id: 20,
    slug: 'sliding-window-maximum',
    title: 'Sliding Window Maximum',
    difficulty: 'Hard',
    completed: false,
    description: 'You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You need to return the max sliding window.',
    exampleInput: 'nums = [1,3,-1,-3,5,3,6,7], k = 3',
    exampleOutput: '[3,3,5,5,6,7]',
    starterCode: `class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        // your code here
    }
};`,
  },

];