import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Request,
  Param,
  UseGuards,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import { UsersService } from './user.service';
import {
  CreateUserDto,
  ForgotPassDto,
  LoginDto,
  SetReminderDto,
  tokenDto,
  UpdateProfile,
} from './dto/create-user.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { MoviesService } from './movies.service';
import { AuthGuard } from '../auth/jwt-auth.guard';
import { WatchlistService } from './watchlist.service';
import {
  AddMovieDto,
  CreateWatchlistDto,
  EditWatchlistDto,
  RemoveMovieDto,
} from './dto/watchlist.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly watchlistService: WatchlistService,
    private moviesService: MoviesService,
  ) {}

  @Post('signup')
  @ApiBearerAuth()
  //   @UseGuards(ShortThrottlerGuard)
  @ApiOperation({
    description: 'Sign up for new user',
  })
  async signup(@Body() createUser: CreateUserDto) {
    return await this.usersService.create(createUser);
  }

  @Post('/verify-email')
  @ApiBearerAuth()
  @UseGuards()
  @ApiOperation({
    description: 'Verify user email',
  })
  async verifyUserEmail(@Body() tokenData: tokenDto) {
    //Takes the email and token from the tokenData from the user and sends to the service method
    return await this.usersService.verifyUserEmail(tokenData);
  }

  @Post('login')
  @ApiBearerAuth()
  //   @UseGuards(LongThrottlerGuard)
  @ApiOperation({
    description: 'User login',
  })
  async login(@Body() loginDto: LoginDto) {
    const loginData = await this.usersService.userLogIn(
      loginDto.email,
      loginDto.password,
    );

    return loginData;
  }

  @Post('forgot-password')
  @ApiBearerAuth()
  @UseGuards()
  @ApiOperation({
    description: 'User forgot password, send reset email',
  })
  async userForgotPassword(@Body() emailPass: ForgotPassDto) {
    const forgotPass = await this.usersService.userForgotPassword(
      emailPass.email,
    );

    return forgotPass;
  }

  // Get user profile
  @Get('get-profile')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    description: 'Get user profile',
  })
  async getProfile(@Request() req: any) {
    return await this.usersService.getUserProfile(req.user.userId);
  }

  // Get & update user profile
  @Put('update-profile')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    description: 'Update user profile',
  })
  async updateProfile(@Request() req: any, @Body() updateData: UpdateProfile) {
    return await this.usersService.updateUserProfile(
      req.user.userId,
      updateData,
    );
  }

  // Search for movies by query with pagination
  @Get('search')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Search for movies by query with pagination',
  })
  async searchMovies(
    @Query('query') query: string,
    @Query('page') page: number,
  ) {
    if (!query) {
      return { error: true, message: 'Query parameter is required' };
    }
    return await this.moviesService.searchMovies(query, page);
  }

  // Get details of a specific movie
  @Get('get-movie/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  //   @UseGuards(LongThrottlerGuard)
  @ApiOperation({
    description: 'Get details of a specific movie',
  })
  async getMovieDetails(@Param('id') id: number) {
    return await this.moviesService.getMovieDetails(id);
  }

  @Post('mark-watched/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  //   @UseGuards(LongThrottlerGuard)
  @ApiOperation({
    description: 'Mark a movie as watched by ID',
  })
  async markMovie(@Param('id') id: number, @Request() req: any) {
    return await this.moviesService.markMovieWatched(id, req.user.userId);
  }

  @Get('get-movie-history')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  //   @UseGuards(LongThrottlerGuard)
  @ApiOperation({
    description: 'Get user movie history',
  })
  async getHistory(@Request() req: any) {
    return await this.moviesService.getHistory(req.user.userId);
  }

  @Delete('delete-history')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    description: 'Delete History',
  })
  async deleteHistory(@Request() req: any) {
    return await this.moviesService.deleteHistory(req.user.userId);
  }

  @Get('get-current-streak')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  //   @UseGuards(LongThrottlerGuard)
  @ApiOperation({
    description: 'Get user current streak',
  })
  async getCurrentStreak(@Request() req: any) {
    return await this.moviesService.calculateStreak(req.user.userId);
  }

  // Fetch popular movies with pagination
  @Get('popular')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Fetch popular movies with pagination',
  })
  async getPopularMovies(@Query('page') page: number) {
    return await this.moviesService.getPopularMovies(page);
  }

  // Fetch top-rated movies with pagination
  @Get('top-rated')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Get top-rated movies with pagination',
  })
  async getTopRatedMovies(@Query('page') page: number) {
    return await this.moviesService.getTopRatedMovies(page);
  }

  // Fetch trending movies with pagination
  @Get('trending')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Get trending movies with pagination',
  })
  async getTrendingMovies(@Query('page') page: number) {
    return await this.moviesService.getTrendingMovies(page);
  }

  // Fetch genres
  @Get('genres')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Get list of movie genres',
  })
  async getGenres() {
    return await this.moviesService.getGenres();
  }

  // Fetch movie recommendations with pagination
  @Get('recommendations/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Get movie recommendations with pagination',
  })
  async getRecommendations(
    @Param('id') id: number,
    @Query('page') page: number,
  ) {
    return await this.moviesService.getRecommendations(id, page);
  }

  @Get('get-by-mood')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Get movies based on user mood',
  })
  async fetchMoviesByMood(@Query('genre') genre: string) {
    return await this.moviesService.getMoviesByMood(genre);
  }

  // Search for people with pagination
  @Get('people/search')
  @ApiBearerAuth()
  @ApiOperation({
    description:
      'Search for actors, directors, or crew members by name with pagination',
  })
  async searchPeople(
    @Query('query') query: string,
    @Query('page') page: number,
  ) {
    if (!query) {
      return { error: true, message: 'Query parameter is required' };
    }
    return await this.moviesService.searchPeople(query, page);
  }

  // Fetch trailers and videos for a movie
  @Get('videos/:id')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Get trailers and other videos for a specific movie',
  })
  async getVideos(@Param('id') id: number) {
    return await this.moviesService.getVideos(id);
  }

  // Fetch movie images
  @Get('images/:id')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Get posters, backdrops, and other images for a movie',
  })
  async getImages(@Param('id') id: number) {
    return await this.moviesService.getImages(id);
  }

  @Post('watchlist/create')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    description: 'Create Watchlist',
  })
  async createWatchlist(
    @Request() req: any,
    @Body() createWatchlistDto: CreateWatchlistDto,
  ) {
    const { name, description } = createWatchlistDto;
    return await this.watchlistService.createWatchlist(
      req.user.userId,
      name,
      description,
    );
  }

  @Put('watchlist/edit')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    description: 'Edit Watchlist',
  })
  async editWatchlist(@Body() editWatchlistDto: EditWatchlistDto) {
    const { watchlistId, name, description } = editWatchlistDto;
    return await this.watchlistService.editWatchlist(
      watchlistId,
      name,
      description,
    );
  }

  @Post('watchlist/add-movie')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    description: 'Add movie to Watchlist',
  })
  async addMovieToWatchlist(@Body() addMovieDto: AddMovieDto) {
    const { watchlistId, movieId } = addMovieDto;
    return await this.watchlistService.addMovieToWatchlist(
      watchlistId,
      movieId,
    );
  }

  @Delete('watchlist/remove-movie')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    description: 'Remove movie from Watchlist',
  })
  async removeMovieFromWatchlist(@Body() removeMovieDto: RemoveMovieDto) {
    const { watchlistId, movieId } = removeMovieDto;
    return await this.watchlistService.removeMovieFromWatchlist(
      watchlistId,
      movieId,
    );
  }

  @Get('user-watchlists')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    description: 'Get User Watchlist',
  })
  async getUserWatchlists(@Request() req: any) {
    return await this.watchlistService.getUserWatchlists(req.user.userId);
  }

  @Get('watchlist/details/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    description: 'Get Single Watchlist',
  })
  async getWatchlistById(@Param('id') id: string) {
    return await this.watchlistService.getWatchlistById(id);
  }

  @Delete('delete-watchlist/:watchlistId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    description: 'Delete Watchlist',
  })
  async deleteWatchlist(@Param('watchlistId') watchlistId: string) {
    return await this.watchlistService.deleteWatchlistById(watchlistId);
  }

  @Post('set-reminder')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    description: 'Set reminder for movie',
  })
  async setReminder(
    @Request() req: any,
    @Body() setReminderData: SetReminderDto,
  ) {
    return await this.usersService.setReminder(
      req.user.userId,
      setReminderData.movieId,
      setReminderData.reminderTime,
    );
  }

  @Get('get-reminders')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    description: 'Get User Reminders',
  })
  async getUserReminders(@Request() req: any) {
    return await this.usersService.getNotifications(req.user.userId);
  }

  @Delete('delete-reminder/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    description: 'Delete Reminder',
  })
  async deleteReminder(@Param('id') id: string) {
    return await this.usersService.cancelReminder(id);
  }

  @Patch('mark-reminder/:reminderId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    description: 'Mark Reminder',
  })
  async markReminderSent(@Param('reminderId') reminderId: string) {
    return await this.usersService.markReminderAsSent(reminderId);
  }
}
