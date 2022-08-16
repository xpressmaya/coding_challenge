class UsersController < ApplicationController
  before_action :ensure_frame_response, only: [:new, :employments]

  # GET /users or /users.json
  def index
    @users = User.all
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # POST /users or /users.json
  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        format.turbo_stream do
          render turbo_stream: [
            turbo_stream.append('users-table-body', partial: 'users/user', locals: {user: @user}),
            turbo_stream.replace('remote_modal', partial: 'users/employments', locals: {user: @user})
          ]
        end
      else
        # format.html { render :new, status: :unprocessable_entity }
        # format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def employments
    @user = User.find(params[:user_id])
    respond_to do |format|
      if @user.update(employment_params)
        # format.html { redirect_to employment_url(@employment), notice: "Employment was successfully updated." }
        # format.json { render :show, status: :ok, location: @employment }
      else
        # format.html { render :edit, status: :unprocessable_entity }
        # format.json { render json: @employment.errors, status: :unprocessable_entity }
      end
    end
  end

  private

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:first_name, :last_name, :nick_name, :email_address, :phone_number)
    end

    def employment_params
      params.require(:user).permit(employments_attributes: [:employer, :date_started, :date_ended])
    end

    # Only allow turbo frame requests
    def ensure_frame_response
      redirect_to root_path unless turbo_frame_request?
    end
end
