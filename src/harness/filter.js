FP.define('ResourceOne.view.loansource.todo.filters.period.PeriodFilterBase',{
    config:{
        dateFormat:"m/d/Y",
        filterOptions:{}
    },

    /**
     * Base function for filtering based on period values. Subclasses to override this
     */
    filter:function(item){
        return true;
    },

    /**
     * Gets the date to be used for filtering
     */
    _getFilterDate:function(item){
        return item.data.dueDate;
    },

    /**
     * Gets the current date
     */
    _getCurrentDate:function(){
        var currentDate = new Date();
        return currentDate;
    },

    

    getFilterOptions:function(){
        return this.config.filterOptions;
    },

    /**
     * Returns the day of the week for the specified date where 0 represents Sunday. 
     */
    _getDayOfWeek:function(date){
        var nativeDate = new Date(date);
        var dayOfTheWeek = nativeDate.getDay();
        return dayOfTheWeek;
    }
});

FP.define('ResourceOne.view.loansource.todo.filters.period.OverduePeriodFilter',{
    extend:'ResourceOne.view.loansource.todo.filters.period.PeriodFilterBase',
    /**
     * Filters based on overdue option
     */
    filter:function(item){
        if(item.data.isCompleted){
            return false;
        }
            
        var filterDate = this._getFilterDate(item);

        // If filter date is less than the current date, return true else return false
        return (item.data.isOverDue || (filterDate < this._getCurrentDate()));
    }
});